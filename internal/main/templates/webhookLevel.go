package templates

type WebhookLevel string

const (
	FATAL   WebhookLevel = "FATAL"
	WARNING WebhookLevel = "WARNING"
	INFO    WebhookLevel = "INFO"
)
