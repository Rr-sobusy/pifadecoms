

export async function POST(){
    // const { searchParams } = new URL(request.url);
    // const providerId = searchParams.get('providerId');
    // const redirectUrl = searchParams.get('redirectUrl');
    // const { error } = await authClient.signInWithOAuth({ provider: providerId, redirectUrl });
    // if (error) {
    //   return NextResponse.json({ error }, { status: 500 });
    // }
    return Response.json({ message: 'Sign in successful' }, { status: 200 })
}