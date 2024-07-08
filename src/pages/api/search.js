import { connectDB } from "@/util/db";

export default async function search(req, res){
    
    if(req.method == 'POST'){
        let input_value = JSON.parse(req.body);
        let result_value = ''

        const db = (await connectDB).db('mydb');
        let result = await db.collection('llm').findOne({name:input_value?.name})
        //let result = await db.collection('llm').find().toArray()
        
        if(result === null || result === undefined){
            result_value = '내용 없음'
        }else{
            result_value = result?.msg;
        }

        res.status(200).json({msg:result_value})
    }else{
        res.status(405).json({msg:'action 방식이 POST가 아님...'})
    }
}