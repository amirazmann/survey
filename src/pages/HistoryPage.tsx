import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface SurveyQuestion {
  question: string;
}

interface Survey {
  createdAt: string;
}

interface HistoryEntry {
  id: number;
  answer: string;
  surveyId: number;
  createdAt: string;
  surveyQuestions: SurveyQuestion;
  surveys: Survey;
}

interface GroupedSubmission {
  surveyId: number;
  createdAt: string;
  answers: {
    question: string;
    answer: string;
  }[];
}

export default function HistoryPage() {
  const [grouped, setGrouped] = useState<GroupedSubmission[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get<HistoryEntry[]>("api/surveyAnswers")
      .then((response) => {
        const groupedData: GroupedSubmission[] = [];

        response.data.forEach((entry) => {
          const group = groupedData.find(g => g.surveyId === entry.surveyId);

          const answer = {
            question: entry.surveyQuestions.question,
            answer: entry.answer,
          };

          if (group) {
            group.answers.push(answer);
          } else {
            groupedData.push({
              surveyId: entry.surveyId,
              createdAt: entry.surveys.createdAt,
              answers: [answer],
            });
          }
        });

        setGrouped(groupedData);
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error(err.message);
      });
  }, []);

  return (
    <Layout>
      <main className="w-full max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className="mb-4 bg-background border border-primary text-primary px-4 py-2 rounded-lg shadow hover:bg-primary hover:text-background"
        >
          &lt; Back to Survey
        </button>

        <div className="bg-background rounded-xl shadow-lg p-8">
          <h2 className="text-lg font-bold text-secondary mb-2">Previous Submissions</h2>
          <p className="text-secondary/80 text-sm mb-4">Review your past survey responses</p>

          {grouped.length === 0 ? (
            <p className="text-secondary/60 text-sm">No submissions found.</p>
          ) : (
            grouped.map((submission) => (
              <div key={submission.surveyId} className="mb-8 border-l-4 border-primary pl-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary font-semibold">
                    #{submission.surveyId} Submission
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {submission.answers.map((a, idx) => (
                  <div key={idx} className="mb-2">
                    <h3 className="text-secondary text-sm font-semibold mb-1">{a.question}</h3>
                    <div className="bg-secondary/5 rounded p-2 text-secondary">{a.answer}</div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </main>
    </Layout>
  );
}
