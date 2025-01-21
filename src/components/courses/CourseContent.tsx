import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Module {
  title: string;
  description: string;
  duration: string;
}

interface CourseContentProps {
  overview: string;
  modules: Module[];
}

export default function CourseContent({ overview, modules }: CourseContentProps) {
  return (
    <Tabs defaultValue="overview" className="mb-16">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: overview }}
        />
      </TabsContent>
      
      <TabsContent value="curriculum">
        <div className="space-y-6">
          {modules.map((module, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle>Module {index + 1}: {module.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {module.description}
                    </p>
                  </div>
                  <Badge variant="outline">{module.duration}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}