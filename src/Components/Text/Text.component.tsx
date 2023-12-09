import React from 'react';

interface IProps {
  text: string;
  variant: 'title' | 'paragraph' | 'subheading';
  color: string;
  fontSize: number;
}

export const Text = ({ color, fontSize, text, variant }: IProps) => {
  return (
    <>
      {variant === 'title' ? (
        <h1 style={{ fontSize, color }}>{text}</h1>
      ) : variant === 'subheading' ? (
        <h2 style={{ fontSize, color }}>{text}</h2>
      ) : (
        <p style={{ fontSize, color }}>{text}</p>
      )}
    </>
  );
};
