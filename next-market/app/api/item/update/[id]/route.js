import { NextResponse } from "next/server"
import connectDB  from "../../../../utils/datebase"
import { ItemModel } from "../../../../utils/schemaModels"

export async function PUT(request, context){
    const reqBody = await request.json() 
    try{
        await connectDB()
        const params = await context.params                         // 追加
        const singleItem = await ItemModel.findById(params.id)      // 変更
            await ItemModel.updateOne({_id: params.id}, reqBody)   // 変更
            return NextResponse.json({message: "アイテム編集成功"})
    }catch{
        return NextResponse.json({message: "アイテム編集失敗"})
    }

}
