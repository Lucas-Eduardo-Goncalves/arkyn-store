package providers

import "time"

type DateGenerator interface{ Now() time.Time }
