package domainErrors

type Kind int

const (
	KindNotFound Kind = iota
	KindAlreadyExists
	KindInvalidInput
	KindConflict
)

type DomainError struct {
	Kind    Kind
	Message string
}

func (e *DomainError) Error() string { return e.Message }

func NotFound(message string) error {
	return &DomainError{Kind: KindNotFound, Message: message}
}

func AlreadyExists(message string) error {
	return &DomainError{Kind: KindAlreadyExists, Message: message}
}

func Invalid(message string) error {
	return &DomainError{Kind: KindInvalidInput, Message: message}
}

func Conflict(message string) error {
	return &DomainError{Kind: KindConflict, Message: message}
}
