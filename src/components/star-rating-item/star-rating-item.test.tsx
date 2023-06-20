import { render, screen } from '@testing-library/react';
import StarRatingItem from './star-rating-item';

const id = 1;
const onChange = jest.fn();
const register = jest.fn();
const isChecked = true;
const disabled = false;

const fakeComponent = (
  <StarRatingItem
    id={1}
    onChange={onChange}
    isChecked={isChecked}
    disabled={disabled}
    register={register}
  />
);

describe('Component: StarRatingItem', () => {
  it('should render star rating correctly', () => {
    render(fakeComponent);

    expect(screen.getByTestId(`star-${id + 1}`)).toBeChecked();

    expect(screen.getByTestId(`star-${id + 1}`)).toHaveAttribute(
      'value',
      String(id + 1)
    );

    expect(screen.getByTestId(`star-${id + 1}`)).not.toBeDisabled();
  });
});
