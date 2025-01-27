import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NewsTypeIcon = ({ type }) => {
    const iconMap = {
        speaking: "🎤",
        award: "🏆",
        news: "📰",
        project: "🚀"
    };
    return <span className="mr-2">{iconMap[type] || '📌'}</span>;
};

const RecentNews = ({ news }) => {
    if (!Array.isArray(news)) {
        return null;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Laatste nieuws</h2>
            <div className="grid gap-4">
                {news.slice(0, 5).map((item, index) => (
                    <Card key={index} className="bg-surface-1 border-surface-2 overflow-hidden">
                        <CardHeader className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <NewsTypeIcon type={item.data.type} />
                                        <CardTitle className="text-lg text-text-primary">
                                            {item.data.title}
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-text-secondary">
                                        {item.data.summary}
                                    </CardDescription>
                                </div>
                                <span className="text-sm text-text-tertiary whitespace-nowrap ml-4">
                                    {new Date(item.data.date).toLocaleDateString()}
                                </span>
                            </div>
                            {item.data.labels && item.data.labels.length > 0 && (
                                <CardContent className="p-0">
                                    <div className="flex gap-2 flex-wrap">
                                        {item.data.labels.map((label, i) => (
                                            <Badge key={i} variant="secondary" className="bg-surface-2 text-text-secondary">
                                                {label}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            )}
                        </CardHeader>
                        {item.data.image && (
                            <div className="px-6 pb-6">
                                <img
                                    src={item.data.image.src}
                                    alt={item.data.image.alt}
                                    className="rounded-lg w-full h-48 object-cover"
                                />
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecentNews;