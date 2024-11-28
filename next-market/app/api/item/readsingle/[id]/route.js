import { NextResponse } from "next/server"
import connectDB from "../../../../utils/datebase"
import { ItemModel } from "../../../../utils/schemaModels"

export async function GET(request,context){
    
    try{
        await connectDB()
        const params = await context.params                       // 追加
        const singleItem = await ItemModel.findById(params.id)    // 変更
        return NextResponse.json({message: "アイテム読み込み成功（シングル）",singleItem})
    }catch{
        return NextResponse.json({message: "アイテム読み込み失敗（シングル）"})
    }
    
}



