import { model, Schema, Types } from 'mongoose'

export interface NoteType {
  user: Types.ObjectId
  ticket: Types.ObjectId
  text: string
  isStaff: boolean
  staffId?: string
}

const noteSchema = new Schema<NoteType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    ticket: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket'
    },
    text: {
      type: String,
      required: [true, 'Please add some text']
    },
    isStaff: {
      type: Boolean,
      default: false
    },
    staffId: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const noteModel = model<NoteType>('Note', noteSchema)

export default noteModel
