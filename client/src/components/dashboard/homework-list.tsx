
import React from 'react';
import { Badge } from "@/components/ui/badge";

const HomeworkList: React.FC = () => {
  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'overdue':
        return 'destructive';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const dummyHomeworkItems = [
    { id: 1, title: 'Math Assignment', status: 'completed' },
    { id: 2, title: 'Science Project', status: 'overdue' },
    { id: 3, title: 'History Essay', status: 'pending' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Список домашних заданий</h2>
      <div className="space-y-2">
        {dummyHomeworkItems.map(item => (
          <div key={item.id} className="p-4 border rounded-md">
            <div className="flex justify-between">
              <h3>{item.title}</h3>
              <Badge variant={getStatusVariant(item.status)}>
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeworkList;
