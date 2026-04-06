import { PrismaClient, Role, Gender } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding data...')

    // 1. Delete existing data to prevent duplicates on multiple runs
    await prisma.booking.deleteMany()
    await prisma.trainerProfile.deleteMany()
    await prisma.membershipPlan.deleteMany()
    // await prisma.user.deleteMany() // Giữ lại User tránh mất tài khoản test đăng nhập

    // 2. Create Membership Plans
    await prisma.membershipPlan.create({
        data: {
            name: 'Basic Access',
            price: 29.00,
            durationMonths: 1,
            features: ["Gym Access", "Locker Room", "No PT Sessions"],
            isPopular: false,
        },
    })

    await prisma.membershipPlan.create({
        data: {
            name: 'PT Advanced',
            price: 59.00,
            durationMonths: 1,
            features: ["Gym Access", "2 PT Sessions/mo", "Nutrition Guide"],
            isPopular: true,
        },
    })

    await prisma.membershipPlan.create({
        data: {
            name: 'VIP Experience',
            price: 99.00,
            durationMonths: 1,
            features: ["24/7 Access", "Unlimited PT", "Private Sauna"],
            isPopular: false,
        },
    })

    console.log(`Created 3 Membership Plans`)

    // 3. Create sample Trainers (Requires User accounts with Role = TRAINER)
    // Alex Johnson
    const userAlex = await prisma.user.upsert({
        where: { email: 'alex.trainer@gympro.com' },
        update: {},
        create: {
            email: 'alex.trainer@gympro.com',
            name: 'Alex Johnson',
            passwordHash: 'hashed_password_mock', // Thường ko login trực tiếp
            role: Role.TRAINER,
            gender: Gender.MALE,
        }
    })

    await prisma.trainerProfile.create({
        data: {
            userId: userAlex.id,
            specialty: 'Specializes in HIIT & Strength',
            rating: 4.9,
            reviewCount: 120,
            monthlyRate: 100.00,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBeAFffCiHe3dAnxDyFwl5hpVIavasDa2uExojg8xemO0sb43sRLVEANWJ41B2X7h12GFsflD0xBpxf4_5LcpqnU_wHcMBQmAzkj8PNmmGKeO0inExHJ-c1SudpKJFsVRUmpMZ6bOGHj8rKQy72s21Qkfhq6P-Y5TsxJ2Q4kzTggECJeVg6jViBw-T7mIKiMqUhEOHzJxfoXRgDEK65P106Pdz9NTQtGR_UTvw31ypQMQ26uTJZIkH2aaYp3fgXJnH8x8veSZG0eI'
        }
    })

    // Sarah Connor
    const userSarah = await prisma.user.upsert({
        where: { email: 'sarah.trainer@gympro.com' },
        update: {},
        create: {
            email: 'sarah.trainer@gympro.com',
            name: 'Sarah Connor',
            passwordHash: 'hashed_password_mock',
            role: Role.TRAINER,
            gender: Gender.FEMALE,
        }
    })

    await prisma.trainerProfile.create({
        data: {
            userId: userSarah.id,
            specialty: 'Expert in Bodybuilding',
            rating: 5.0,
            reviewCount: 210,
            monthlyRate: 150.00,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6Qa8TtA20n1PWhgi69v4ddfZm0S4jEvWoiDsHky9mVD73SPFJvVw-gjD9-jq_sYsvgRv8QH9ofcIoAyGPF05S7HS-8Xi-U0SwfK0N7EpeF8le_sK0yfKgkjM8NMpm5t9AG0WG8qKwgbbzQUhgHIYl6Q9bswTKP--WMDvs66BYjANkWKmjARosA3rcLPVw6MOGoDta6JuqimXTx-4TOwMGOq0ay5xtR9n9aaE5wIBnQgEU_bYVRZBp03bEExHp4LAy8wqviEXVuiw'
        }
    })

    // Mike Ross
    const userMike = await prisma.user.upsert({
        where: { email: 'mike.trainer@gympro.com' },
        update: {},
        create: {
            email: 'mike.trainer@gympro.com',
            name: 'Mike Ross',
            passwordHash: 'hashed_password_mock',
            role: Role.TRAINER,
            gender: Gender.MALE,
        }
    })

    await prisma.trainerProfile.create({
        data: {
            userId: userMike.id,
            specialty: 'Cardio & Endurance Coach',
            rating: 4.8,
            reviewCount: 85,
            monthlyRate: 80.00,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl56bWSzxcM_QLyobLmlGd5oqaGMc_Xocuz6m3gsXf-Vls-F25m6HCBbtz7Yn_scEs77qIYqRj3LAPnCRfTINrzT3UkvUs25Wvn45nLHXCAUciKXynUmTYLxrxbnCnlQFdvuBwEXo2jetljPsOxbMVGRl9BTLufLaxYni1QGqXPcst5FVCki3t13x-1cY5UG_ggtuAjXzBtA3YRACsUlJq7Fif7lChCOh-K2rXcmmcbMvkau-602B3JBh5oST5fKn8qR-sjI-KVRY'
        }
    })

    // Emma Stone
    const userEmma = await prisma.user.upsert({
        where: { email: 'emma.trainer@gympro.com' },
        update: {},
        create: {
            email: 'emma.trainer@gympro.com',
            name: 'Emma Stone',
            passwordHash: 'hashed_password_mock',
            role: Role.TRAINER,
            gender: Gender.FEMALE,
        }
    })

    await prisma.trainerProfile.create({
        data: {
            userId: userEmma.id,
            specialty: 'Yoga & Flexibility',
            rating: 4.7,
            reviewCount: 92,
            monthlyRate: 90.00,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-qWUMSyqdeeYu84kLi62DalO_ZvXtdawVjHwKNpzQtJGSEFXtz4e8laYDs8D0NrOVHvG8mTPr2UxZVk1LIgjy0AUqEK2IpuSjX0yVoMaDbKn9iYPbAj0SYGT-AaejHGjinebfSj8xHMydrmM4iOkdXTyNemIVO7Igr46FdbK_wZtgowekLUigULTvhe_jnfrp7B46MiDlGstmNdhuWVi7A_0kgOc9DWfIZt0AYdJLoidoKugIpDMST-nms_RU6Ehs-y-L7YAXMJo'
        }
    })

    console.log(`Created 4 Trainers`)

    // Marcus Silva
    const userMarcus = await prisma.user.upsert({
        where: { email: 'marcus.trainer@gympro.com' },
        update: {},
        create: {
            email: 'marcus.trainer@gympro.com',
            name: 'Marcus Silva',
            passwordHash: 'hashed_password_mock',
            role: Role.TRAINER,
            gender: Gender.MALE,
        }
    })

    await prisma.trainerProfile.create({
        data: {
            userId: userMarcus.id,
            specialty: 'Powerlifting & Macros',
            rating: 4.8,
            reviewCount: 45,
            monthlyRate: 95.00,
            imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop'
        }
    })

    // Elena Rodriguez
    const userElena = await prisma.user.upsert({
        where: { email: 'elena.trainer@gympro.com' },
        update: {},
        create: {
            email: 'elena.trainer@gympro.com',
            name: 'Elena Rodriguez',
            passwordHash: 'hashed_password_mock',
            role: Role.TRAINER,
            gender: Gender.FEMALE,
        }
    })

    await prisma.trainerProfile.create({
        data: {
            userId: userElena.id,
            specialty: 'Pilates & Core Training',
            rating: 4.9,
            reviewCount: 156,
            monthlyRate: 110.00,
            imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop'
        }
    })

    // Jack Murphy
    const userJack = await prisma.user.upsert({
        where: { email: 'jack.trainer@gympro.com' },
        update: {},
        create: {
            email: 'jack.trainer@gympro.com',
            name: 'Jack Murphy',
            passwordHash: 'hashed_password_mock',
            role: Role.TRAINER,
            gender: Gender.MALE,
        }
    })

    await prisma.trainerProfile.create({
        data: {
            userId: userJack.id,
            specialty: 'Boxing & Agility',
            rating: 4.7,
            reviewCount: 88,
            monthlyRate: 85.00,
            imageUrl: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1973&auto=format&fit=crop'
        }
    })

    // Sophia Lee
    const userSophia = await prisma.user.upsert({
        where: { email: 'sophia.trainer@gympro.com' },
        update: {},
        create: {
            email: 'sophia.trainer@gympro.com',
            name: 'Sophia Lee',
            passwordHash: 'hashed_password_mock',
            role: Role.TRAINER,
            gender: Gender.FEMALE,
        }
    })

    await prisma.trainerProfile.create({
        data: {
            userId: userSophia.id,
            specialty: 'Rehabilitation & Posture',
            rating: 5.0,
            reviewCount: 300,
            monthlyRate: 160.00,
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop'
        }
    })

    console.log(`Created 8 Trainers`)
    console.log('Seeding complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
