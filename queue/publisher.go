package queue

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

var (
	IP                  = os.Getenv("AMQP_IP")
	rabbitmq_identifier = fmt.Sprintf("amqp://guest:guest@%s:5672/", IP)
)

type Publisher struct {
	ch   *amqp.Channel
	conn *amqp.Connection
}

func NewFileUploadedPublisher() *Publisher {
	ch, conn, err := initChannel()
	failOnError(err, "Failed to create connection")
	return &Publisher{
		ch:   ch,
		conn: conn,
	}
}

func initChannel() (*amqp.Channel, *amqp.Connection, error) {
	conn, err := amqp.Dial(rabbitmq_identifier)
	failOnError(err, "Failed to connect to RabbitMq")

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")

	return ch, conn, err

}

func (p *Publisher) PushMessage(message string) {

	q, err := p.ch.QueueDeclare(
		"hello", //name
		false,   //durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no wait
		nil,     //arguments
	)
	failOnError(err, "Failed to declare a queue")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	body := message

	err = p.ch.PublishWithContext(ctx,
		"", //exchange
		q.Name,
		false, // mandatory
		false, //immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		},
	)

	failOnError(err, "Failed to publish a message")
	log.Printf("[x] Sent %s \n", body)

}

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func (p *Publisher) Close() {
	p.ch.Close()
	p.conn.Close()
}
