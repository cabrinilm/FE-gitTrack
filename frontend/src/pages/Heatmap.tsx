import { useAuth } from "@/context/useAuth";

export default function HeatMap() {
    const {token} = useAuth();
      console.log("Token do usuário logado:", token);
    return (
<div className="p-4">
      
            <h1 className="text 3x1 font-bold">Home - Challenge Active</h1>
            <p>Soon: active challenge, activities, </p>
        </div>
    );
};