import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type IconProps } from '@phosphor-icons/react';

interface SummaryCardProps {
  title: string;
  icon: React.ComponentType<IconProps>;
  value: string | number;
}

function SummaryCard({ title, icon, value }: SummaryCardProps) {
  const Icon = icon;
  return (
    <Card>
      <CardContent sx={{ position: 'relative' }}>
        <Stack spacing={2}>
          <Typography variant="caption" fontWeight={500} color="textSecondary" fontSize={15}>
            {title}
          </Typography>
          <Stack position="absolute" right={15} top={15}>
            <Icon size={25} />
          </Stack>
          <Typography variant="h6" fontSize={25} fontWeight={700}>
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
