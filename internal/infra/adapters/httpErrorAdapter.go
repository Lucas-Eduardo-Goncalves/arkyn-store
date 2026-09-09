package adapters

import (
	"encoding/json"
	"errors"
	"net/http"

	domainErrors "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/errors"
)

type HttpError struct {
	StatusCode int    `json:"-"`
	Message    string `json:"message"`
}

func (e *HttpError) Error() string {
	return e.Message
}

func NewBadRequest(message string) *HttpError {
	return &HttpError{http.StatusBadRequest, message}
}

func NewNotFound(message string) *HttpError {
	return &HttpError{http.StatusNotFound, message}
}

func NewConflict(message string) *HttpError {
	return &HttpError{http.StatusConflict, message}
}

func NewUnauthorized(message string) *HttpError {
	return &HttpError{http.StatusUnauthorized, message}
}

func NewForbidden(message string) *HttpError {
	return &HttpError{http.StatusForbidden, message}
}

func NewInternalServerError(message string) *HttpError {
	return &HttpError{http.StatusInternalServerError, message}
}

func toHttpError(err error) *HttpError {
	var httpErr *HttpError

	if errors.As(err, &httpErr) {
		return httpErr
	}

	var domainErr *domainErrors.DomainError

	if errors.As(err, &domainErr) {
		switch domainErr.Kind {
		case domainErrors.KindNotFound:
			return NewNotFound(domainErr.Message)
		case domainErrors.KindAlreadyExists, domainErrors.KindConflict:
			return NewConflict(domainErr.Message)
		case domainErrors.KindInvalidInput:
			return NewBadRequest(domainErr.Message)
		}
	}

	return NewInternalServerError("Internal server error")
}

func HandleError(w http.ResponseWriter, err error) {
	httpError := toHttpError(err)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpError.StatusCode)
	json.NewEncoder(w).Encode(httpError)
}
