import { NextResponse } from "next/server"
import connectDB  from "../../../../utils/datebase"
import { ItemModel } from "../../../../utils/schemaModels"

export async function PUT(request, context){
    const reqBody = await request.json() 
    try{
        await connectDB()
        const params = await context.params                         // 追加
        const singleItem = await ItemModel.findById(params.id)      // 変更
        if(singleItem.email === reqBody.email){
            await ItemModel.updateOne({_id: params.id}, reqBody)   // 変更
            return NextResponse.json({message: "アイテム編集成功"})
        }else{
            return NextResponse.json({message:"他の人が作成したアイテムです"})

        }            
    }catch{
        return NextResponse.json({message: "アイテム編集失敗"})
    }

}
