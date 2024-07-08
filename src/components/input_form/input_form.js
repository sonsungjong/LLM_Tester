'use client';

import { useState } from 'react';
import './input_form.css';
// method='POST' action='/api/search'
export default function InputForm()
{
    let [input1, setInput1] = useState('')
    let [result1, setResult1] = useState('')

    return(
        <div className='inputform-container'>
            <header className='inputform-header'>
                <h1>LLM 테스트기</h1>
            </header>

            <div className='inputform-form'>
                    <label htmlFor="first">가, 나, 다, 라</label>
                    <input type="text" id="first" name="name" onChange={(e)=>{setInput1(e.target.value)}}/>
                    <p className="inputform-actions">
                        <button onClick={
                            ()=>{
                                console.log(input1)
                                fetch('/api/search', {
                                    method: 'POST',
                                    body:JSON.stringify({name:input1})
                                }).then(
                                    (res)=>{
                                        if(res.status == 200){
                                            console.log(200)
                                            return res.json()
                                        }else{
                                            throw new Error('요청 실패')
                                        }
                                    }
                                ).then(
                                    (data)=>{
                                        console.log('요청결과: ',data.msg);
                                        setResult1(data?.msg)
                                    }
                                ).catch((err)=>{
                                    console.log('요청오류: ',err);
                                }).finally(()=>{
                                    document.getElementById('first').value = '';
                                    setInput1('');
                                });
                            }
                        }>전송</button>
                    </p>
                    {
                        result1 && (
                            <p>
                                {result1}
                            </p>
                        )
                    }
            </div>

        </div>
    )
}