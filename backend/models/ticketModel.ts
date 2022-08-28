import { model, Schema, Types } from 'mongoose'

export interface TicketType {
  user: Types.ObjectId
  product: string
  description: string
  status: 'new' | 'open' | 'closed'
}

const ticketSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad']
    },
    description: {
      type: String,
      required: [true, 'Please enter a description for the ticket']
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
)

// export type TicketType = InferSchemaType<typeof ticketSchema>

export const ticketModel = model<TicketType>('Ticket', ticketSchema)
