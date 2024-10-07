import { AntDesign, Feather } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={26} {...props} />,
    othersrequests: (props)=> <Feather name="compass" size={26} {...props} />,
    myrequests: (props)=> <AntDesign name="pluscircleo" size={26} {...props} />,
    lentrequests: (props)=> <AntDesign name="user" size={26} {...props} />,
}