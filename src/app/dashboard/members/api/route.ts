/**
 * * The main purpose of this route is to simplify debouncing of the members when searched in every Members' Autocomplete component.
 * * Instead of fetching data in server, I prefer to use fetching of member's data in client side for better ux.
 */
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Parse request body
    const req: { memberName?: string } = await request.json();

    // Validate input
    if (!req.memberName || req.memberName.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid memberName' }), {
        status: 400,
      });
    }

    const members = await prisma.members.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: req.memberName,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: req.memberName,
              mode: 'insensitive',
            },
          },
        ],
        accountStatus : "Active"
      },
      take: 20, // Limit the number of results to improve UX and performance
    });

    return new Response(JSON.stringify(members), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch members' }),
      { status: 500 }
    );
  }
}

