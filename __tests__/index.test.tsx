import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Index from '../app/index';

describe('Index Screen', () => {
  it('renders correctly', () => {
    render(<Index />);
    
    // Check if the default text is displayed
    const textElement = screen.getByText('Edit app/index.tsx to edit this screen.');
    expect(textElement).toBeDefined();
  });

  it('has the correct layout styles', () => {
    const { getByText } = render(<Index />);
    
    // Get the parent View component of the text
    const view = getByText('Edit app/index.tsx to edit this screen.').parent;
    
    // Check if the View has the expected styles
    expect(view).toHaveStyle({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    });
  });
});
