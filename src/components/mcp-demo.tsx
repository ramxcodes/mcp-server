"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Terminal, CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const demoSteps = [
  {
    id: 1,
    command: "creatorInfo",
    description: "Connecting to MCP Server...",
    result: "Here is the creator info...",
    delay: 1000,
  },
  {
    id: 2,
    command: "getDocument",
    description: "Fetching documents with id 1...",
    result: "Found 1 document",
    delay: 1500,
  },
  {
    id: 3,
    command: "listDocuments",
    description: "Listing all documents...",
    result: "Found 3 documents",
    delay: 1200,
  },
  {
    id: 4,
    command: "createDocument",
    description: "Creating new document...",
    result: "Document created with ID: 1",
    delay: 800,
  },
  {
    id: 5,
    command: "updateDocument",
    description: "Updating document with ID 1...",
    result: "Document updated new name : Bhindi AI",
    delay: 1000,
  },
  {
    id: 6,
    command: "deleteDocument",
    description: "Deleting document with id 1...",
    result: "Document deleted successfully",
    delay: 1000,
  },
  {
    id: 7,
    command: "upsertDocument",
    description: "Upserting document with id 1...",
    result: "Document upserted successfully",
    delay: 1000,
  },
];

export default function MCPDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const runDemo = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setCompletedSteps([]);

    for (let i = 0; i < demoSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, demoSteps[i].delay));
      setCompletedSteps((prev) => [...prev, i]);
    }

    setIsRunning(false);
    setCurrentStep(-1);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(-1);
    setCompletedSteps([]);
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <Badge
          variant="outline"
          className="mb-4 border-slate-700 text-slate-300"
        >
          Live Demo
        </Badge>
        <h2 className="text-4xl font-bold text-white mb-4">
          MCP Server in Action
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Watch the AppWrite MCP Server handle database operations in real-time
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Terminal className="h-5 w-5 text-green-400" />
              MCP Server Demo Terminal
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={runDemo}
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run Demo"}
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                className="border-slate-700 hover:bg-slate-800"
              >
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-950/80 rounded-lg p-6 font-mono text-sm min-h-[400px]">
              <div className="text-green-400 mb-4">
                $ AppWrite MCP Server Demo
              </div>

              <AnimatePresence>
                {demoSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity:
                        index <= currentStep || completedSteps.includes(index)
                          ? 1
                          : 0.3,
                      x: 0,
                    }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-400">$</span>
                      <span className="text-slate-300">{step.command}</span>
                    </div>

                    <AnimatePresence>
                      {(index <= currentStep ||
                        completedSteps.includes(index)) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 space-y-2"
                        >
                          {index === currentStep &&
                            isRunning &&
                            !completedSteps.includes(index) && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 text-yellow-400"
                              >
                                <Clock className="h-4 w-4 animate-spin" />
                                {step.description}
                              </motion.div>
                            )}

                          {completedSteps.includes(index) && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 text-green-400"
                            >
                              <CheckCircle className="h-4 w-4" />
                              {step.result}
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>

              {completedSteps.length === demoSteps.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-900/20 border border-green-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-green-400 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    Demo completed successfully!
                  </div>
                  <p className="text-slate-300 mt-2">
                    The MCP Server handled all database operations seamlessly.
                  </p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
