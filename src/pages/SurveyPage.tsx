import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";
import api from "../config/axios";

interface Question {
  id: number;
  question: string;
  createdBy: string;
}

export default function SurveyPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get<Question[]>("/api/surveyQuestions")
      .then((response) => {
        setQuestions(response.data);
        setAnswers(Array(response.data.length).fill(""));
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error(err.message);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[current] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/history");
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = () => {
    const payload = questions.map((q, index) => ({
      surveyQuestionId: q.id,
      answer: answers[index],
    }));

    api
      .post("/api/SurveyAnswers", payload)
      .then((response) => {
        toast.success("Survey has been submitted!");
        navigate("/history");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.message);
      });
  };

  const isLastQuestion = current === questions.length - 1;

  return (
    <Layout showHistoryButton={false}>
      <main className="bg-background rounded-xl shadow-lg p-12 w-full max-w-3xl">
        {questions.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-secondary">
                Question {current + 1} of {questions.length}
              </h2>
              <p className="text-secondary/80 text-base">
                Please provide your honest feedback
              </p>
              <ProgressBar current={current} total={questions.length} />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-secondary">
              {questions[current].question}
            </h3>
            <textarea
              className="w-full border border-secondary/20 rounded-lg p-4 min-h-[120px] mb-6 focus:outline-none focus:ring-2 focus:ring-primary text-base"
              placeholder="Type your answer here..."
              value={answers[current]}
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <button
                className="bg-background border border-secondary/30 text-secondary px-6 py-3 rounded-lg hover:bg-secondary hover:text-background text-base"
                onClick={handleBack}
              >
                &lt; Back
              </button>
              <button
                className={`px-6 py-3 rounded-lg text-background text-base ${
                  answers[current]
                    ? "bg-primary hover:bg-secondary"
                    : "bg-secondary/30 cursor-not-allowed"
                }`}
                onClick={isLastQuestion ? handleSubmit : handleNext}
                disabled={!answers[current]}
              >
                {isLastQuestion ? "Submit" : "Next >"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-secondary mb-6">Sorry, no questions for now...</p>
            <div className="flex justify-start">
              <button
                className="bg-background border border-secondary/30 text-secondary px-6 py-3 rounded-lg hover:bg-secondary hover:text-background text-base"
                onClick={handleBack}
              >
                &lt; Back
              </button>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}
