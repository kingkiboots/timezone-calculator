import { ComponentPropsWithoutRef, forwardRef, memo } from 'react'
import { ICommonInputProps } from '../types/FormTypes'

interface InputProps extends ComponentPropsWithoutRef<'input'>, ICommonInputProps {}
export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ labelLeadingComponent, placeholder, ...props }, forwardedRef) => {
      return (
        <div className="component-input">
          <label>
            {labelLeadingComponent}
            <input ref={forwardedRef} {...props} />
          </label>
        </div>
      )
    }
  )
)

Input.displayName = 'Input'
