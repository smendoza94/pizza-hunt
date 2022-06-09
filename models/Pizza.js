const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // middleware function from utils/dateformat, convert to wanted format
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      required: true,
      // enum stands for enumerable, refers to a set of data that can be iterated over—
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      // to provide custom message on "error", use validate: ,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      // virtual function to use the to return the comment counts
      // virtuals help extend models by creating a "virtual" field
      // that can be evaluated when the documents are retrieved from the database.
      virtuals: true,
      // tell mongoose that it should use "getter" functions
      getters: true,
    },
    // set id to false, virtual functions dont need ids
    id: false,
  }
);

// get the total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
