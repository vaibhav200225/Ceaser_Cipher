import random
import pyfiglet
import colorama
from colorama import *
colorama.init(autoreset=True)
VZSECURE = (Fore.BLUE + Style.BRIGHT + pyfiglet.figlet_format("VZSECURE"))
print(VZSECURE)

print(Fore.GREEN + Style.BRIGHT + "This is the CEASER-CIPHER ENCRYPTION")
print(Fore.GREEN + Style.BRIGHT + "created by vaibhav zadane")
print(Fore.GREEN + Style.BRIGHT + "Created on 18-12-2021\n")

def RESTART():

    ALPHABET = (' :A+1B<2C>D3]E4/F[5G?6H!I7J@8K}L{9M#NO$0PQ%R^ST&U~V*WX&YZ')
    VALUE = random.randint(0, len(ALPHABET))
    KEY = int(VALUE)

    print(Fore.GREEN + '[-]'+ Fore.BLUE + "1.Only encryption\n")
    print(Fore.GREEN + '[-]'+ Fore.BLUE + "2.Both encryp/decryp\n")
    print(Fore.GREEN + '[-]'+ Fore.BLUE + "3.For brute-force the encryption\n")
    Choice = int(input(Fore.CYAN + "Choose any one of above: "))

    if(Choice==1):
        ENCRYPTION=str(input(Fore.CYAN + "Your Encryption letter/word:\n"))
        def ceaser_encrypt(plain_text):
            cipher_text=''
            plain_text=plain_text.upper()

            for c in plain_text:
                index = ALPHABET.find(c)
                index = (index+KEY)%len(ALPHABET)
                cipher_text=cipher_text+ALPHABET[index]

            return cipher_text

        if __name__ == "__main__":
            encrypted = ceaser_encrypt(ENCRYPTION)
            print(Fore.GREEN + Style.BRIGHT + encrypted)
        CONTINUE()


    elif(Choice==2):
        ENCRYPTION=str(input(Fore.CYAN + "Your Encryption letter/word:\n"))
        def ceaser_encrypt(plain_text):
            cipher_text=''
            plain_text=plain_text.upper()

            for c in plain_text:
                index = ALPHABET.find(c)
                index = (index+KEY)%len(ALPHABET)
                cipher_text=cipher_text+ALPHABET[index]

            return cipher_text

        def ceaser_decrypt(cipher_text):
            plain_text = ''

            for c in cipher_text:
                index = ALPHABET.find(c)
                index = (index-KEY)%len(ALPHABET)
                plain_text = plain_text+ALPHABET[index]

            return plain_text

        if __name__ == "__main__":
            encrypted = ceaser_encrypt(ENCRYPTION)
            print(Fore.GREEN + encrypted)
            decrypted = ceaser_decrypt(encrypted)
            print(Fore.GREEN + decrypted)
        CONTINUE()

    elif(Choice==3):
        
        NEW_ENCRYPTION = str(input(Fore.CYAN +"Please enter the text that you have to BRUTE-FORCE: \n"))
        def ceaser_crack(cipher_text):
             for key in range (len(ALPHABET)):
                 plain_text = ''

                 for c in cipher_text:
                    index =ALPHABET.find(c)
                    index = (index-key)%len(ALPHABET)
                    plain_text = plain_text + ALPHABET[index]
                 print(Fore.GREEN + "[-] With key %s, the result is: %s"%(key,plain_text))
                
        if __name__ == "__main__":
            encrypted = NEW_ENCRYPTION
            ceaser_crack(encrypted)
        CONTINUE()

    else:
        print(Fore.GREEN + Style.BRIGHT + "You have entered invalid option!")
        exit

def CONTINUE():
    restart=str(input(Fore.CYAN + "Do you want to restart the programe?(YES/NO):\n").lower())
    
    if(restart == 'yes'):
        print()
        RESTART()

    elif(restart == 'no'):
        print(Fore.GREEN + "THANK YOU for using this programme!!")

    else:
        print(Fore.GREEN + "invalid syntac!!")
        exit
        
RESTART()
