import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TaskManagementFeedback = ({ analysisFeedback }) => {
  const [expanded, setExpanded] = useState({});

  const toggleSection = (sectionTitle) => {
    setExpanded(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const renderContent = (text) => {
    const sections = text.split('##').filter(section => section.trim());
    
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const sectionTitle = lines[0].trim();
      
      return (
        <Accordion 
          key={index}
          expanded={expanded[sectionTitle] || false}
          onChange={() => toggleSection(sectionTitle)}
          sx={{ mb: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              fontWeight: 'bold'
            }}
          >
            <Typography variant="subtitle1">{sectionTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {lines.slice(1).map((line, lineIndex) => {
              if (line.startsWith('**')) {
                return (
                  <Typography 
                    key={lineIndex} 
                    variant="subtitle2" 
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {line.replace(/\*/g, '').trim()}
                  </Typography>
                );
              }
              
              return line.trim() ? (
                <Typography 
                  key={lineIndex} 
                  variant="body2" 
                  sx={{ mb: 1 }}
                >
                  {line.trim()}
                </Typography>
              ) : null;
            })}
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return (
    <Card sx={{ margin: 'auto', boxShadow: 2 }}>
      <CardContent>
        {renderContent(analysisFeedback)}
      </CardContent>
    </Card>
  );
};

export default TaskManagementFeedback;