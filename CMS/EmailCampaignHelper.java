package CMS;


/**
 * Generated from IDL struct "EmailCampaign".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class EmailCampaignHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(EmailCampaignHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_struct_tc(CMS.EmailCampaignHelper.id(),"EmailCampaign",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("campaignId", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("title", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("content", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("targetSegment", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("status", org.omg.CORBA.ORB.init().create_string_tc(0), null)});
				}
			}
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final CMS.EmailCampaign s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static CMS.EmailCampaign extract (final org.omg.CORBA.Any any)
	{
		org.omg.CORBA.portable.InputStream in = any.create_input_stream();
		try
		{
			return read (in);
		}
		finally
		{
			try
			{
				in.close();
			}
			catch (java.io.IOException e)
			{
			throw new RuntimeException("Unexpected exception " + e.toString() );
			}
		}
	}

	public static String id()
	{
		return "IDL:CMS/EmailCampaign:1.0";
	}
	public static CMS.EmailCampaign read (final org.omg.CORBA.portable.InputStream in)
	{
		CMS.EmailCampaign result = new CMS.EmailCampaign();
		result.campaignId=in.read_string();
		result.title=in.read_string();
		result.content=in.read_string();
		result.targetSegment=in.read_string();
		result.status=in.read_string();
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final CMS.EmailCampaign s)
	{
		java.lang.String tmpResult6 = s.campaignId;
out.write_string( tmpResult6 );
		java.lang.String tmpResult7 = s.title;
out.write_string( tmpResult7 );
		java.lang.String tmpResult8 = s.content;
out.write_string( tmpResult8 );
		java.lang.String tmpResult9 = s.targetSegment;
out.write_string( tmpResult9 );
		java.lang.String tmpResult10 = s.status;
out.write_string( tmpResult10 );
	}
}
