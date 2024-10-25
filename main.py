import random

def play_game(balance, bet_amount):
    choices = ['가위', '바위', '보']
    user_choice = input("가위, 바위, 보 중 하나를 선택하세요: ")
    
    if user_choice not in choices:
        print("잘못된 선택입니다. 게임이 종료됩니다.")
        return balance, False  # 잘못된 선택 시 게임 종료

    computer_choice = random.choice(choices)
    print(f"컴퓨터의 선택: {computer_choice}")

    if user_choice == computer_choice:
        print("비겼습니다! 잔액은 유지됩니다.")
        print(f"현재 잔액: {balance}원")  # 잔액 보여주기
        return balance, True  # 잔액 유지, 계속 진행
    elif (user_choice == '가위' and computer_choice == '보') or \
         (user_choice == '바위' and computer_choice == '가위') or \
         (user_choice == '보' and computer_choice == '바위'):
        balance += bet_amount  # 이기면 배팅 금액을 더함
        print(f"당신이 이겼습니다! 잔액: {balance}원")
    else:
        balance = 0  # 지면 잔액을 0으로 초기화
        print(f"컴퓨터가 이겼습니다! 잔액: {balance}원")

    return balance, True  # 게임이 끝났음을 표시

if __name__ == "__main__":
    balance = 5000  # 고정된 초기 잔액 설정

    try:
        print(f"배팅 금액: {balance}원")
        bet_amount = int(input("배팅할 금액을 입력하세요: "))
        if bet_amount > balance:
            print("잔액이 부족합니다. 프로그램을 종료합니다.")
            exit()
    except ValueError:
        print("유효한 금액을 입력하세요.")
        exit()

    while True:
        if balance <= 0:
            print("잔액이 0원이 되어 게임을 종료합니다.")
            break

        balance, continue_game = play_game(balance, bet_amount)

        if not continue_game:
            break  # 잘못된 선택 시 게임 종료
