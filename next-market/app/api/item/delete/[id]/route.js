import { NextResponse } from "next/server";
import connectDB from "../../../../utils/datebase"
import { ItemModel } from "../../../../utils/schemaModels"


export async function DELETE(request, context) {
    try{
        await connectDB()
        const params = await context.params                       // 追加
        const singleItem = await ItemModel.findById(params.id)    // 変更
            await ItemModel.deleteOne({_id: params.id})           // 変更
        return NextResponse.json({message: "アイテムの削除成功"})
    }catch{
        return NextResponse.json({message :"アイテム削除失敗"})
    }
}