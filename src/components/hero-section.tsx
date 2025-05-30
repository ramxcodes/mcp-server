"use client";

import { ScriptCopyBtnDemo } from "./copy-url-btn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Zap,
  Shield,
  Rocket,
  Terminal,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and performance",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Built with security best practices",
  },
  {
    icon: Rocket,
    title: "Easy Setup",
    description: "Get started in minutes, not hours",
  },
];

const terminalCommands = [
  {
    command: "mcp.connect('https://mcp.ramx.in/mcp')",
    status: "success",
    delay: 1000,
  },
  {
    command: "mcp.listDocuments({ db: 'companies' })",
    status: "success",
    delay: 2000,
  },
  {
    command: "mcp.createDocument({ title: 'Bhindi AI' })",
    status: "success",
    delay: 3000,
  },
  { command: "mcp.getDocument('Bhindi AI')", status: "success", delay: 4000 },
];

const floatingCards = [
  {
    title: "Database Operations",
    value: "7 Tools",
    icon: Database,
    color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  {
    title: "Response Time",
    value: "~50ms",
    icon: Zap,
    color: "bg-green-500/10 border-green-500/20 text-green-400",
  },
  {
    title: "Success Rate",
    value: "99.9%",
    icon: CheckCircle2,
    color: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  },
];

export default function HeroSection() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTerminal(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTerminal) return;

    const interval = setInterval(() => {
      setCurrentCommand((prev) => (prev + 1) % terminalCommands.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [showTerminal]);

  return (
    <section className="container mx-auto px-4 py-20 min-h-screen flex items-center">
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left side - Main content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge
              variant="outline"
              className="border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <Database className="w-3 h-3 mr-2" />
              MCP Server v1.0
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">AppWrite</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                MCP Server
              </span>{" "}
              <span className="wave">👋🏻</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-slate-300 leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Seamlessly integrate powerful database operations into your
            applications with our Model Context Protocol server.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-slate-400 font-medium">Copy the server URL:</p>
            <ScriptCopyBtnDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700"
              >
                <feature.icon className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">{feature.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Terminal and floating cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Main terminal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Terminal className="h-5 w-5 text-green-400" />
                  MCP Server Console
                  <div className="ml-auto flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-950/80 rounded-lg p-4 font-mono text-sm min-h-[200px]">
                  <div className="text-green-400 mb-3">
                    $ mcp-server --live-demo
                  </div>

                  <AnimatePresence mode="wait">
                    {showTerminal && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2"
                      >
                        {terminalCommands.map((cmd, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: index <= currentCommand ? 1 : 0.3,
                              x: 0,
                            }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <span className="text-blue-400">&gt;</span>
                            <span className="text-slate-300 text-xs sm:text-sm break-all">
                              {cmd.command}
                            </span>
                            {index <= currentCommand && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto flex-shrink-0"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}

                        {currentCommand < terminalCommands.length && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-yellow-400"
                          >
                            <Clock className="h-4 w-4 animate-spin" />
                            <span>Processing...</span>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Floating stats cards */}
          {floatingCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              className={`absolute ${
                index === 0
                  ? "hidden lg:block -top-14 -right-24 lg:-top-14 lg:-right-24"
                  : index === 1
                  ? "hidden lg:block -bottom-14 -left-24 lg:-bottom-14 lg:-left-24"
                  : "hidden lg:block top-1/2 -right-12 lg:top-1/2 lg:-right-12 transform -translate-y-1/2"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`${card.color} border backdrop-blur-sm rounded-lg p-3 min-w-[120px]`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <card.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{card.title}</span>
                </div>
                <div className="text-lg font-bold text-white">{card.value}</div>
              </motion.div>
            </motion.div>
          ))}

          {/* Mobile stats cards - shown only on mobile */}
          <div className="mt-6 lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={`mobile-${card.title}`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`${card.color} border backdrop-blur-sm rounded-lg p-3 w-full`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <card.icon className="h-4 w-4" />
                      <span className="text-xs font-medium">{card.title}</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {card.value}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
