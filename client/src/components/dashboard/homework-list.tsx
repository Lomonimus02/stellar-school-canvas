
import React from 'react';
import { Badge } from "@/components/ui/badge";

// This is a placeholder file to fix type errors
const HomeworkList: React.FC = () => {
  // Fix the Badge variant type issue by using only valid variants
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'overdue':
        return 'destructive';
      case 'pending':
        return 'outline'; // Changed from 'warning' to 'outline' which is a valid variant
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
      <h2 className="text-xl font-bold">Homework List</h2>
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
