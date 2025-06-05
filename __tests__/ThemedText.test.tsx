import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemedText } from '../components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock the useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn()
}));

describe('ThemedText', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (useThemeColor as jest.Mock).mockReturnValue('#000000'); // Default mock return value
  });

  test('renders correctly with default props', () => {
    const { getByText } = render(<ThemedText>Test Text</ThemedText>);
    expect(getByText('Test Text')).toBeTruthy();
    expect(useThemeColor).toHaveBeenCalledWith({ light: undefined, dark: undefined }, 'text');
  });

  test('applies the correct style for default type', () => {
    const { getByText } = render(<ThemedText>Test Text</ThemedText>);
    const textElement = getByText('Test Text');
    
    // Default style should be applied
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { color: '#000000' },
        expect.objectContaining({ fontSize: 16, lineHeight: 24 }),
      ])
    );
  });

  test('applies the correct style for title type', () => {
    const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);
    const textElement = getByText('Title Text');
    
    // Title style should be applied
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { color: '#000000' },
        expect.objectContaining({ fontSize: 32, fontWeight: 'bold', lineHeight: 32 }),
      ])
    );
  });

  test('applies the correct style for defaultSemiBold type', () => {
    const { getByText } = render(<ThemedText type="defaultSemiBold">Semi Bold Text</ThemedText>);
    const textElement = getByText('Semi Bold Text');
    
    // DefaultSemiBold style should be applied
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { color: '#000000' },
        expect.objectContaining({ fontSize: 16, lineHeight: 24, fontWeight: '600' }),
      ])
    );
  });

  test('applies the correct style for subtitle type', () => {
    const { getByText } = render(<ThemedText type="subtitle">Subtitle Text</ThemedText>);
    const textElement = getByText('Subtitle Text');
    
    // Subtitle style should be applied
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { color: '#000000' },
        expect.objectContaining({ fontSize: 20, fontWeight: 'bold' }),
      ])
    );
  });

  test('applies the correct style for link type', () => {
    const { getByText } = render(<ThemedText type="link">Link Text</ThemedText>);
    const textElement = getByText('Link Text');
    
    // Link style should be applied
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { color: '#000000' },
        expect.objectContaining({ lineHeight: 30, fontSize: 16, color: '#0a7ea4' }),
      ])
    );
  });

  test('custom styles override default styles', () => {
    const customStyle = { fontSize: 24, color: 'red' };
    const { getByText } = render(<ThemedText style={customStyle}>Custom Text</ThemedText>);
    const textElement = getByText('Custom Text');
    
    // The custom style should be the last item in the style array
    expect(textElement.props.style[textElement.props.style.length - 1]).toEqual(customStyle);
  });

  test('passes custom colors to useThemeColor', () => {
    render(<ThemedText lightColor="lightblue" darkColor="darkblue">Colored Text</ThemedText>);
    
    // Check if useThemeColor was called with the right arguments
    expect(useThemeColor).toHaveBeenCalledWith({ light: 'lightblue', dark: 'darkblue' }, 'text');
  });

  test('passes additional props to Text component', () => {
    const testID = 'test-text-id';
    const numberOfLines = 2;
    const { getByTestId } = render(
      <ThemedText testID={testID} numberOfLines={numberOfLines}>
        Test Text with Props
      </ThemedText>
    );
    
    const textElement = getByTestId(testID);
    expect(textElement.props.numberOfLines).toBe(numberOfLines);
  });
});
