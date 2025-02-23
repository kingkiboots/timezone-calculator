import { ComponentPropsWithoutRef, forwardRef, memo, useMemo } from 'react'
import { ICommonInputProps } from '../types/FormTypes'

interface SelectboxProps extends ComponentPropsWithoutRef<'select'>, ICommonInputProps {
  placeholder?: string
}
const PLACEHOLDER_VALUE = ''
export const Selectbox = memo(
  forwardRef<HTMLSelectElement, SelectboxProps>(
    ({ labelLeadingComponent, placeholder, defaultValue, children, ...props }, forwardedRef) => {
      const _defaultValue = useMemo(() => {
        if (defaultValue) {
          return defaultValue
        }

        if (placeholder) {
          return PLACEHOLDER_VALUE
        }

        return undefined
      }, [defaultValue, placeholder])

      return (
        <div className="component-select">
          <label>
            {labelLeadingComponent}
            <select ref={forwardedRef} defaultValue={_defaultValue} {...props}>
              {placeholder ? <Placeholder placeholder={placeholder} /> : null}
              {children}
            </select>
          </label>
        </div>
      )
    }
  )
)

const Placeholder = memo<Pick<SelectboxProps, 'placeholder'>>(({ placeholder }) => {
  return (
    <option value={PLACEHOLDER_VALUE} disabled hidden>
      {placeholder}
    </option>
  )
})

Selectbox.displayName = 'Selectbox'
