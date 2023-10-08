import React from 'react';
import printHelloWorld from '@/scripts/script';
import Form from '@/components/Form';

export default function App({ page }) {
  printHelloWorld();
  return (
    <>
      <Form />
      <img src="/images/background.jpg"/>
    </>
  );
}
