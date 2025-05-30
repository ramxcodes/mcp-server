"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function LinkAndInfo() {
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
          Open Source
        </Badge>
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Explore the source code, contribute to the project, and start building
          with the AppWrite MCP Server
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto"
      >
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center gap-2 text-2xl">
              <Github className="h-6 w-6 text-white" />
              GitHub Repository
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-slate-400">
              Access the complete source code integrate
              <br />
              MCP Server into your projects.
            </p>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-black hover:bg-slate-200 font-semibold text-lg py-6"
              >
                <a
                  href="https://github.com/ramxcodes/mcp-server"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
            </motion.div>

            <div className="text-center pt-4 border-t border-slate-800">
              <p className="text-slate-500 text-sm">
                Built with ❤️ by{" "}
                <Link
                  className="underline"
                  href="https://ramx.in"
                  target="_blank"
                >
                  Ram
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-20 pt-12 border-t border-slate-800"
      >
        <p className="text-slate-500 text-sm">
          © 2025 Ramxcodes. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}
