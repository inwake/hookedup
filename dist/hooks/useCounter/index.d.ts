import PropTypes from 'prop-types';
type IUseCounter = {
    count: number;
    increment: () => void;
    reset: () => void;
    decrement: () => void;
};
/**
 * Classic counter example to help understand the flow of this npm package
 *
 * @param    {number} initialValue
 *           initial counter value
 *
 * @return   {Object}
 *           object with count and methods
 *
 * @property {number} count
 *           The current count state
 *
 * @property {()=>void} increment
 *           the increment function
 *
 * @property {()=>void} decrement
 *           the decrement function
 *
 * @property {()=>void} reset
 *           the reset function
 *
 * @example
 *   const ExampleComponent = () => {
 *     const { count, increment, reset, decrement } = useCounter();
 *
 *     return (
 *       <>
 *         <button onClick={increment}>Increment counter</button>
 *         <button onClick={reset}>Reset counter</button>
 *         <button onClick={decrement}>Decrement counter</button>
 *         <p>{count}</p>
 *       </>
 *      )
 *    }
 */
export declare const useCounter: {
    (initialValue?: number): IUseCounter;
    PropTypes: {
        initialValue: PropTypes.Validator<number>;
    };
    defaultProps: {
        initialValue: number;
    };
};
export {};
