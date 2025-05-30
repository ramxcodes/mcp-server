"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Video, Maximize2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

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
          Video Demo
        </Badge>
        <h2 className="text-4xl font-bold text-white mb-4">See It In Action</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Watch a comprehensive walkthrough of the AppWrite MCP Server features
          and capabilities
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Video className="h-5 w-5 text-purple-400" />
              AppWrite MCP Server Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative group">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                {/* Video placeholder with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40"></div>

                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(120,119,198,0.1)_360deg)]"></div>
                </div>

                {!isPlaying ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="mb-6"
                    >
                      <Button
                        size="lg"
                        onClick={() => setIsPlaying(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-20 h-20 p-0 shadow-2xl shadow-purple-500/25"
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Watch the Demo
                    </h3>
                    <p className="text-slate-400">
                      Learn how to integrate and use the MCP Server
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full relative"
                  >
                    <video
                      className="w-full h-full object-cover"
                      src="/demo.mp4"
                      controls
                      autoPlay
                      onEnded={() => setIsPlaying(false)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-4 right-4 bg-black/50 border-slate-600 hover:bg-black/70"
                      onClick={() => setIsPlaying(false)}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
