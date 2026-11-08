# --- ЗАДАНИЕ 1: Создаем класс Appointment ---
class Appointment:
    def __init__(self, appointment_id, client_name, master_id, service_id, time):
        self.id = appointment_id
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time

# Имитация базы данных (заглушки для мастеров и услуг, чтобы код работал)
class Master:
    def __init__(self, master_id):
        self.master_id = master_id

class Service:
    def __init__(self, service_id):
        self.service_id = service_id

def get_master(master_id):
    # Для теста всегда возвращаем мастера с нужным ID
    return Master(master_id)

def get_service(service_id):
    # Для теста всегда возвращаем услугу с нужным ID
    return Service(service_id)

appointments = []

# --- Функция создания записи с проверками (Задание 1 + Задание 2) ---
def create_appointment(client_name: str, master_id: int, service_id: int, time: str) -> Appointment | None:
    master = get_master(master_id)
    service = get_service(service_id)
    
    # 1. Проверка на существование мастера и услуги
    if master is None or service is None:
        return None
        
    # 2. Проверка на пустые поля (Задание 1)
    if not client_name or not time:
        return None

    # 3. Проверка рабочего времени (Задание 2)
    # Разделяем время "10:00" на часы и минуты, берем только часы
    try:
        hour = int(time.split(":")[0])
    except (ValueError, IndexError):
        return None # Если время не в формате "ЧЧ:ММ"

    # Салон работает с 08:00 до 20:00
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



print("--- Проверка 1: Создание записей ---")
first_appointment = create_appointment("Иванова А.А.", 1, 1, '10:00')
second_appointment = create_appointment("Петрова А.А.", 1, 1, '11:00')

print("Список записей:")
for appointment in appointments:
    print(appointment.client_name, appointment.time)

print("\n--- Проверка 2: Неполные данные ---")
# Очищаем список для чистоты эксперимента (как в задании)
appointments.clear() 

no_correct_appointment = create_appointment("", 1, 1, '12:00')
print("Количество записей после ошибки с пустым именем:", len(appointments)) # Должно быть 0

print("\n--- Проверка 3: Неверное время (вне рабочих часов) ---")
no_correct_time = create_appointment("Сидорова А.А.", 1, 1, '00:00')
print("Количество записей после ошибки с 00:00:", len(appointments)) # Должно быть 0