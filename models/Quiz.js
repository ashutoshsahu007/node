import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Nested Answer Schema
const AnswerSchema = new Schema({
  text: String,
  isCorrect: Boolean,
});

// Nested Question Schema
const QuestionSchema = new Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ["mcq", "truefalse"], default: "mcq" },
  options: [AnswerSchema],
  timeLimit: { type: Number, default: 30 }, // seconds
  points: { type: Number, default: 10 },
});

// Quiz Schema
const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    isPublic: { type: Boolean, default: true },
    questions: [QuestionSchema],
    tags: [String],
    attemptsAllowed: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// User Schema
const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    passwordHash: String,
    role: {
      type: String,
      enum: ["admin", "player", "org-admin"],
      default: "player",
    },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" },
  },
  { timestamps: true }
);

// Response Schema
const ResponseSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [
    {
      questionId: { type: Schema.Types.ObjectId },
      selectedOptionId: { type: Schema.Types.ObjectId },
      isCorrect: Boolean,
      timeTaken: Number,
    },
  ],
  score: Number,
  submittedAt: { type: Date, default: Date.now },
});

// Organization Schema (multi-tenant support)
const OrganizationSchema = new Schema(
  {
    name: String,
    domain: String, // optional for white-labeling
    adminUser: { type: Schema.Types.ObjectId, ref: "User" },
    logo: String,
    plan: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
  },
  { timestamps: true }
);

// Virtual for quiz total points
QuizSchema.virtual("totalPoints").get(function () {
  return this.questions.reduce((sum, q) => sum + (q.points || 0), 0);
});

// Middleware to auto-score responses
ResponseSchema.pre("save", function (next) {
  this.score = this.answers.reduce(
    (acc, ans) => acc + (ans.isCorrect ? 1 : 0),
    0
  );
  next();
});

// Export models
export const User = model("User", UserSchema);
export const Quiz = model("Quiz", QuizSchema);
export const Response = model("Response", ResponseSchema);
export const Organization = model("Organization", OrganizationSchema);
