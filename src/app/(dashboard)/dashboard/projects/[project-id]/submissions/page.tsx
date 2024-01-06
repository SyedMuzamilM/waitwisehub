import React from "react";
import { SubmissionTable } from "./submission-table";

const Submissions = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Submissions</h1>
      <p className="text-zinc-700">Check all the form submissions</p>

      <div className="mt-4">
        <SubmissionTable />
      </div>
    </div>
  );
};

export default Submissions;
