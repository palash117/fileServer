package rate_limiter

import (
	"fmt"
	"testing"
	"time"
)

func TestCreateRateLimiterObj(t *testing.T) {
	rl := rateLimiter{}
	rl = rateLimiter{
		limit:   10,
		timeout: 10 * time.Minute,
	}
	fmt.Println(rl)

	rlp := CreateRateLimiter(10)
	fmt.Println(rlp)
	rlp.GetToken()
	rlp.ReturnToken()
}
