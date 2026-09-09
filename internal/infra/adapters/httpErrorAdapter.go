package adapters

import (
	"encoding/json"
	"net/http"
)

type HttpError struct {
	StatusCode  int               `json:"-"`
	Message     string            `json:"message"`
	Fields      interface{}       `json:"fields,omitempty"`
	FieldErrors map[string]string `json:"fieldErrors,omitempty"`
}

func (e *HttpError) Error() string {
	return e.Message
}

func NewBadRequest(message string) *HttpError {
	return &HttpError{StatusCode: http.StatusBadRequest, Message: message}
}

func NewNotFound(message string) *HttpError {
	return &HttpError{StatusCode: http.StatusNotFound, Message: message}
}

func NewConflict(message string) *HttpError {
	return &HttpError{StatusCode: http.StatusConflict, Message: message}
}

func NewUnauthorized(message string) *HttpError {
	return &HttpError{StatusCode: http.StatusUnauthorized, Message: message}
}

func NewForbidden(message string) *HttpError {
	return &HttpError{StatusCode: http.StatusForbidden, Message: message}
}

func NewInternalServerError(message string) *HttpError {
	return &HttpError{StatusCode: http.StatusInternalServerError, Message: message}
}

func NewValidationError(fields interface{}, fieldErrors map[string]string) *HttpError {
	return &HttpError{
		StatusCode:  http.StatusBadRequest,
		Message:     "Erro de validação",
		Fields:      fields,
		FieldErrors: fieldErrors,
	}
}

func HandleError(w http.ResponseWriter, err error) {
	httpError, ok := err.(*HttpError)

	if !ok {
		httpError = NewInternalServerError("Internal server error")
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpError.StatusCode)
	json.NewEncoder(w).Encode(httpError)
}
