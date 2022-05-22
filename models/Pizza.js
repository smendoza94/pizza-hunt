const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: String,
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
  // virtual function to use the to return the comment counts
  {
    toJSON: {
      virtuals: true,
    },
    // set id to false, virtual functions dont need ids
    id: false,
  }
);

// get the total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comment.length;
});

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
