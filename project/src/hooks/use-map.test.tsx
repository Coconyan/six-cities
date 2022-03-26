import { renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { cities } from '../mocks/cities';
import useMap from './useMap';

const fakeCity = cities[0];

describe('Hook: useMap', () => {
  it('should return ???', () => {
    const mapRef = useRef(null);

    const {result} = renderHook(() =>
      useMap(mapRef, fakeCity),
    );//TODO next look at the map result object?

    expect(result).toBeInTheDocument();
    // const [answers, handleAnswerChange] = result.current;
    // eslint-disable-next-line no-console
    // console.log(result);

    // expect(result.current).toHaveLength(2);
    // expect(answers).toBeInstanceOf(Array);
    // expect(handleAnswerChange).toBeInstanceOf(Function);
  });

  // it('should be correctly change state', () => {
  //   const expectedInitialAnswers = [false, false, false, false];

  //   const {result} = renderHook(
  //     () => useUserAnswers(fakeQuestionGenre),
  //   );

  //   const [initialAnswers] = result.current;
  //   let [, handleAnswerChange] = result.current;

  //   act(() => handleAnswerChange(1, true));

  //   [, handleAnswerChange] = result.current;

  //   act(() => handleAnswerChange(3, true));

  //   const [answers] = result.current;

  //   expect(initialAnswers).toStrictEqual(expectedInitialAnswers);
  //   expect(answers[1]).toBe(true);
  //   expect(answers[3]).toBe(true);
  // });
});
