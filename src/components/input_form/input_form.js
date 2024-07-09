'use client';

import { useState } from 'react';
import './input_form.css';
import Image from 'next/image';

// method='POST' action='/api/search'
export default function InputForm()
{
    let [input1, setInput1] = useState('')
    let [result1, setResult1] = useState('')
    let [arr, setArr] = useState([]);

    return(
        <div className='inputform-container'>
            <header className='inputform-header'>
                <h1>SAMOO Decarbon Solution</h1>
            </header>

            <div className='inputform-form'>
                <div className='inputform-select-row'>
                    <div>
                        <label htmlFor="region">지역</label>
                        <select id="region">
                            <option value="서울">서울</option>
                            <option value="인천">인천</option>
                            <option value="경기">경기</option>
                            <option value="부산">부산</option>
                            <option value="대구">대구</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="industry">산업</label>
                        <select id="industry">
                            <option value="건설">건설</option>
                            <option value="운송장비">운송장비</option>
                            <option value="부동산서비스">부동산서비스</option>
                            <option value="음료식품">음료식품</option>
                            <option value="화학제품">화학제품</option>
                        </select>
                    </div>
                </div>
                <label htmlFor="first">질문을 입력하세요</label>
                <div className='inputform-row-2'>
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
                                        setArr([...arr, data?.msg])
                                    }
                                ).catch((err)=>{
                                    console.log('요청오류: ',err);
                                }).finally(()=>{
                                    document.getElementById('first').value = '';
                                    setInput1('');
                                });
                            }
                        }>입력</button>
                    </p> 
                    <Image src='/images/excel.jpg' width={50} height={50}/>
                </div>
                    
                    {
                        arr ? (
                            arr.slice().reverse().map((item, index)=>{
                                return(
                                    <p key={index} className='inputform-padding-10' dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, '<br>') }} />
                                )
                            })
                        ) : null
                    }
            </div>

        </div>
    )
}