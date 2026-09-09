package adapters

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

var validate = newValidator()

func newValidator() *validator.Validate {
	v := validator.New()

	v.RegisterTagNameFunc(func(field reflect.StructField) string {
		name := strings.SplitN(field.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})

	return v
}

func ValidateStruct(s interface{}) error {
	err := validate.Struct(s)
	if err == nil {
		return nil
	}

	validationErrors, ok := err.(validator.ValidationErrors)
	if !ok {
		return NewBadRequest(err.Error())
	}

	fieldErrors := make(map[string]string, len(validationErrors))
	for _, fieldError := range validationErrors {
		fieldErrors[fieldError.Field()] = validationErrorMessage(fieldError)
	}

	fields := make(map[string]interface{})
	if raw, marshalErr := json.Marshal(s); marshalErr == nil {
		json.Unmarshal(raw, &fields)
	}

	return NewValidationError(fields, fieldErrors)
}

func validationErrorMessage(fieldError validator.FieldError) string {
	switch fieldError.Tag() {
	case "required":
		return "Este campo é obrigatório"
	case "uuid":
		return "Deve ser um UUID válido"
	case "min":
		return fmt.Sprintf("Deve ter no mínimo %s caracteres", fieldError.Param())
	case "max":
		return fmt.Sprintf("Deve ter no máximo %s caracteres", fieldError.Param())
	case "oneof":
		return fmt.Sprintf("Deve ser um dos seguintes valores: %s", fieldError.Param())
	default:
		return "Valor inválido"
	}
}
