import Link from "next/link";
import Image from "next/image";

const getAllItems = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    try {
        const response = await fetch(`${baseUrl}/api/item/readall`, { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`APIエラー: ステータスコード ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData.allItems || [];
    } catch (error) {
        console.error("データ取得エラー:", error);
        return []; // エラー時は空の配列を返す
    }
};

const ReadAllItems = async () => {
    const allItems = await getAllItems();

    return (
        <div className="grid-container-in">
            {allItems && allItems.length > 0 ? (
                allItems.map((item) => (
                    <Link href={`/item/readsingle/${item._id}`} key={item._id}>
                        <Image 
                            src={item.image || "/placeholder.jpg"} 
                            width={750} 
                            height={500} 
                            alt="item-image" 
                            priority 
                        />
                        <div> 
                            <h2>¥{item.price}</h2>
                            <h3>{item.title}</h3>
                            <p>{item.description.substring(0, 80)}...</p>  
                        </div>
                    </Link>
                ))
            ) : (
                <p>アイテムが見つかりません。</p>
            )}
        </div>
    );
};

export default ReadAllItems;
