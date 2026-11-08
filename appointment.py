# --- Класс записи (Appointment) ---
class Appointment:
    def __init__(self, appointment_id, client_name, master_id, service_id, time):
        self.id = appointment_id
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time


# --- Заглушки для мастеров и услуг (чтобы код работал автономно) ---
class Master:
    def __init__(self, master_id):
        self.master_id = master_id

class Service:
    def __init__(self, service_id):
        self.service_id = service_id

def get_master(master_id):
    # Имитация получения мастера из базы
    return Master(master_id)

def get_service(service_id):
    # Имитация получения услуги из базы
    return Service(service_id)


# --- Список для хранения всех записей ---
appointments = []


# --- Функция создания записи ---
def create_appointment(client_name: str, master_id: int, service_id: int, time: str) -> Appointment | None:
    master = get_master(master_id)
    service = get_service(service_id)
    
    # Проверка 1: Существуют ли мастер и услуга
    if master is None or service is None:
        return None
        
    # Проверка 2: Заполнены ли все поля (Имя и Время не пустые)
    if not client_name or not time:
        return None

    # Проверка 3: Рабочие часы (с 08:00 до 20:00)
    try:
        # Берем строку "10:00", разбиваем по ":" и берем первое значение (часы)
        hour = int(time.split(":")[0])
    except (ValueError, IndexError):
        return None # Если время не в формате "ЧЧ:ММ"

    if hour < 8 or hour >= 20:
        return None

    # Если все проверки пройдены — создаем объект класса Appointment
    new_appointment = Appointment(
        appointment_id=len(appointments) + 1,
        client_name=client_name,
        master_id=master.master_id,
        service_id=service.service_id,
        time=time
    )
    
    appointments.append(new_appointment)
    return new_appointment


# ==========================================
# БЛОК ПРОВЕРКИ (КАК В ЗАДАНИИ)
# ==========================================
if __name__ == "__main__":
    
    # 1. Создаем 2 записи и выводим их
    first_appointment = create_appointment("Иванова А.А.", 1, 1, '10:00')
    second_appointment = create_appointment("Петрова А.А.", 1, 1, '11:00')

    print("Список записей:")
    for appointment in appointments:
        print(appointment.client_name, appointment.time)

    # Очищаем список, чтобы следующая проверка была чистой (вывела 0)
    appointments.clear()

    # 2. Создать запись, где частично не заполнены поля
    no_correct_appointment = create_appointment("", 1, 1, '12:00')
    print(len(appointments)) # Должно вывести 0

    # Очищаем список еще раз
    appointments.clear()

    # 3. Создать запись с некорректным временем (вне рабочих часов)
    no_correct_time = create_appointment("Сидорова А.А.", 1, 1, '00:00')
    print(len(appointments)) # Должно вывести 0