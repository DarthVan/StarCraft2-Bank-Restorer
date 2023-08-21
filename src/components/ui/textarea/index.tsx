/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC, useCallback, useEffect, useState } from 'react';
import './style.css';

/** TextArea **
* ...
* @Author Star Noob
* @Created 2023-08-14
*/

interface Props {
  text?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

const TextArea: FC<Props> = (props: Props): JSX.Element => {
  /* const [text, setText] = useState(props.text ? props.text : '');

  useEffect((): void => {
    setText(props.text ? props.text : '');
  }, [props.text]);

  const onChange: (value: string) => void = useCallback((value: string): void => {
    setText(value);
    props.onChange?.(value);
  }, []);
 */
  return (
    <textarea className='TextArea' style={props.style}
      value={props.text}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => props.onChange?.(e.target.value)/* onChange(e.target.value) */}
      placeholder='Bank code...'
      spellCheck='false'
    />
  );
}

export default React.memo(TextArea);