export interface InputProps {
  value: string                            
  onChange: (value: string) => void        
  placeholder?: string                       
  type?: "text" | "email" | "password"      
  label?: string                            
  error?: string | null                     
  disabled?: boolean                         
  size?: "sm" | "md" | "lg"                 
  required?: boolean                         
  className?: string                         
}